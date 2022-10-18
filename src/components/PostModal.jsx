import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import ImageIcon from "@mui/icons-material/Image";
import CommentIcon from "@mui/icons-material/Comment";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { selectUserEmail, selectUserName, selectUserPhoto } from "./useSlice";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";
const PostModal = ({ handleClick, showModal }) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");
  const userPhoto = useSelector(selectUserPhoto);
  const userName = useSelector(selectUserName);
  const userMail = useSelector(selectUserEmail);
  const postsRef = collection(db, "posts");
  const uploadData = (e) => {
    e.preventDefault();
    addDoc(postsRef, {
      title: userName,
      image: userPhoto,
      sharedImage: shareImage,
      video: videoLink,
      description: editorText,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
      mail: userMail,
    });
    setInterval(function () {
      window.location.reload();
    }, 2000);
    // window.location.reload();
  };
  const switchassetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    setAssetArea("");
    handleClick(e);
  };
  return (
    <>
      {showModal === "open" && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <CloseIcon onClick={(e) => reset(e)} />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                <img
                  src={userPhoto ? `${userPhoto}` : "/images/user.svg"}
                  alt=""
                />
                <span>{userName ? userName : "Name"}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editorText}
                  onChange={(e) => setEditorText(e.target.value)}
                  placeholder="What do you want to talk about"
                  autoFocus={true}
                />
                {assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="text"
                      placeholder="Please input an image link"
                      name="image"
                      value={shareImage}
                      id="file"
                      onChange={(e) => setShareImage(e.target.value)}
                    />
                    {shareImage && <img src={shareImage} />}
                  </UploadImage>
                ) : (
                  assetArea === "media" && (
                    <>
                      <input
                        type="text"
                        placeholder="Please input a video link"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                      />
                      {videoLink && (
                        <ReactPlayer width={"100%"} url={videoLink} />
                      )}
                    </>
                  )
                )}
              </Editor>
            </SharedContent>
            <SharedCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchassetArea("image")}>
                  <ImageIcon />
                </AssetButton>
                <AssetButton onClick={() => switchassetArea("media")}>
                  <YouTubeIcon />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <CommentIcon />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostComment
                disabled={!editorText ? true : false}
                onClick={(e) => {
                  uploadData(e);
                  handleClick(e);
                }}
              >
                Post
              </PostComment>
            </SharedCreation>
          </Content>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  aniamtion: fadeIn 0.3s;
`;

const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 40px;
    width: 40px;
    min-widht: auto;
    color: rgba(0, 0, 0, 0.15);
    CloseIcon,
    img {
      pointer-events: none;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  svg,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    CommentIcon {
      margin-right: 5px;
    }
  }
`;

const PostComment = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1,0.2)" : "white")};
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;
const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
`;

export default PostModal;
