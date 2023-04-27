import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import introVideo from '../../assets/videos/intro.mp4';

const CoursePage = () => {
  const [lectureNumber, setLectureNumber] = useState(0);
  //   const lectureNumber = 0;
  const lectures = [
    {
      _id: 'hkdbcf',
      title: 'Sample',
      description: 'jadghfhikaebgfhkebgf qjbhwefbjkb',
      video: {
        url: 'dkjcvbdjbv',
      },
    },
    {
      _id: 'hkdbcf',
      title: 'Sample2',
      description: 'jadghfhikaebgfhkebgf qjbhwefbjkb',
      video: {
        url: 'dkjcvbdjbv',
      },
    },
    {
      _id: 'hkdbcf',
      title: 'Sample3',
      description: 'jadghfhikaebgfhkebgf qjbhwefbjkb',
      video: {
        url: 'dkjcvbdjbv',
      },
    },
  ];
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <video
          width={'100%'}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo}
        ></video>

        <Heading
          children={`#${lectureNumber + 1} ${lectures[lectureNumber].title} `}
          m="4"
        />
        <Heading children="Description" m="4" />
        <Text children={lectures[lectureNumber].description} m="4" />
      </Box>
      <VStack>
        {lectures.map((element, index) => (
          <button
            onClick={() => setLectureNumber(index)}
            key={element._id}
            style={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              margin: 0,
              borderBottom: '1px solid rgba(0,0,0,0.2) ',
            }}
          >
            <Text onOfLines={1}>
              #{index + 1} {element.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CoursePage;
