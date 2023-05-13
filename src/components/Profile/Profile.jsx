import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromPlaylist,
  updateProfilePicture,
  deleteProfile,
} from '../../redux/actions/profile';
import { cancelSubscription, loadUser } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector(state => state.profile);
  const {
    loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector(state => state.subscription);

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  const removePlaylistHandler = async id => {
    // console.log(id);
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
  };

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription());
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteProfile());
    dispatch(loadUser());
    navigate('/register');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch({ type: 'clearMessage' });
      dispatch(loadUser());
    }
  }, [dispatch, error, message, subscriptionError, subscriptionMessage]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Container minH={'95vh'} maxW="container.lg" py="8">
      <Heading children="Profile" m="8" textTransform={'uppercase'} />
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={['center']}
        spacing={['8', '16']}
        padding={'8'}
      >
        <VStack>
          <Avatar boxSize={'48'} src={user.avatar.url} />
          <Button
            isLoading={loading}
            onClick={onOpen}
            colorScheme="yellow"
            variant={'ghost'}
          >
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children="Name" fontWeight={'bold'} />
            <Text children={user.name} />
          </HStack>
          <HStack>
            <Text children="Email" fontWeight={'bold'} />
            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text children="CreatedAt" fontWeight={'bold'} />
            <Text children={user.createdAt.split('T')[0]} />
          </HStack>
          {user.role !== 'admin' && (
            <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription && user.subscription.status === 'active' ? (
                <Button
                  onClick={cancelSubscriptionHandler}
                  color={'yellow.500'}
                  variant="unstyled"
                  isLoading={subscriptionLoading}
                >
                  Cancel Subscription
                </Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme={'yellow'}>Subscribe</Button>
                </Link>
              )}
              {/* <Text children={user.role} /> */}
            </HStack>
          )}
          <Stack direction={['column', 'row']} alignItems={['center']}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>
            <Link to="/changepassword">
              <Button>Change Password</Button>
            </Link>
            <Button isLoading={loading} onClick={deleteProfileHandler}>
              Delete Profile <RiDeleteBin7Fill />
            </Button>
          </Stack>
        </VStack>
      </Stack>
      <Heading children="Playlist" size={'md'} my="8" />
      {user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems={['center']}
          flexWrap={'wrap'}
          p="4"
        >
          {user.playlist.map(element => (
            <VStack w="48" m="2" key={element.course}>
              <Image
                boxSize={'full'}
                objectFit={'contain'}
                src={element.poster}
              />
              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={'ghost'} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>
                <Button
                  isLoading={loading}
                  onClick={() => removePlaylistHandler(element.course)}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}
      <ChangePhotoBox
        changeImageSubmitHandler={changeImageSubmitHandler}
        isOpen={isOpen}
        onClose={onClose}
        loading={loading}
      />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImage('');
    setImagePrev('');
  };

  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                  onChange={changeImage}
                />

                <Button
                  isLoading={loading}
                  w="full"
                  colorScheme={'yellow'}
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        {/* <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter> */}
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}
