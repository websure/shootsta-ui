import React, { useContext, useEffect, useState } from "react";
import { Grid, Image } from "semantic-ui-react";
import { stateContext } from "./ContextManagement";

const VideoList: React.FC = () => {
  const { thumbnailList } = useContext(stateContext);
  const [imgList, setImgList] = useState<string[]>([]);

  useEffect(() => {
    if (thumbnailList.length > 0) {
      setImgList(thumbnailList);
    }
  }, [thumbnailList]);

  const showThumbList = () => {
    console.log("context ", thumbnailList);
    return imgList.map((val, i) => {
      return (
        <Grid.Column key={i} mobile={4} tablet={4} computer={3}>
          <Image src={val} size="medium" bordered />
        </Grid.Column>
      );
    });
  };
  return (
    <>{imgList.length > 0 ? showThumbList() : <h4 data-testid="noThumbImages"> No videos upload </h4>}</>
  );
};

export default VideoList;
