import React, { useContext, useEffect, useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { stateContext, IVideoList } from "./ContextManagement";

const VideoList: React.FC = () => {
  const { videoObjList = {} } = useContext(stateContext);
  const [videoList, setVideoList] = useState<IVideoList>({});
  const Location = useLocation();
  useEffect(() => {
    if (Object.keys(videoObjList).length > 0) {
      setVideoList({ ...videoList, ...videoObjList });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoObjList]);

  const showThumbList = () => {
    let keys = Object.keys(videoList);
    return keys.map((key, i) => {
      return (
        <Grid.Column
          key={videoList[key].id}
          mobile={8}
          tablet={4}
          computer={3}
          //width={4}
          textAlign="center"
          style={{ marginBottom: "1rem" }}
        >
          <Link
            data-testid={videoList[key].id}
            to={{
              pathname: `videostream`,
              // open route in modal
              state: {
                ismodal: Location,
                videosrc: videoList[key].path,
                videoid: videoList[key].id,
                video: videoList[key]
              }
            }}
          >
            <Image
              title={videoList[key].name}
              src={`http://localhost:5000/assets/images/${videoList[key].id}.png`}
              alt={videoList[key].name}
              bordered
            />
          </Link>
        </Grid.Column>
      );
    });
  };

  return (
    <>
      {Object.keys(videoList).length > 0 ? (
        showThumbList()
      ) : (
        <Grid.Column>
          <h4 data-testid="noThumbImages"> No videos upload </h4>
        </Grid.Column>
      )}
    </>
  );
};

export default VideoList;
