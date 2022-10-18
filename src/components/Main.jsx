import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PostModal from "./PostModal";
import { selectUserPhoto } from "./useSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import db from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArticleIcon from "@mui/icons-material/Article";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReactPlayer from "react-player";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const userPhoto = useSelector(selectUserPhoto);
  const postsRef = collection(db, "posts");
  useEffect(() => {
    getDocs(postsRef).then((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  // console.log(posts[0].date);
  return (
    <Container>
      <ShareBox>
        <div>
          <img src={userPhoto ? userPhoto : "/images/user.svg"} alt="" />
          <button onClick={handleClick}>Start a post</button>
        </div>
        <div>
          <button>
            <InsertPhotoIcon />
            <span>Photo</span>
          </button>

          <button>
            <YouTubeIcon />
            <span>Video</span>
          </button>

          <button>
            <EventNoteIcon />
            <span>Event</span>
          </button>

          <button>
            <ArticleIcon />
            <span>Article</span>
          </button>
        </div>
      </ShareBox>
      {posts.map((post) => (
        <Article key={post.id}>
          <SharedActor>
            <a>
              <img src={post.image ? post.image : "/images/user.svg"} alt="" />
              <div>
                <span>{post.title}</span>
                <span>{post.mail}</span>
                <span>{post.date}</span>
              </div>
            </a>
            <button>
              <MoreHorizIcon />
            </button>
          </SharedActor>
          <Description>{post.description}</Description>
          {post.video === "" ? (
            <SharedImg>
              <a>
                <img
                  src={
                    post.sharedImage
                      ? post.sharedImage
                      : "/images/shared-image.jpg"
                  }
                  alt=""
                />
              </a>
            </SharedImg>
          ) : (
            <ReactPlayer width={"100%"} url={post.video} />
          )}
          <SocialCounts>
            <li>
              <button>
                <img
                  src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                  alt=""
                />
                <img
                  src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                  alt=""
                />
              </button>
              <span>75</span>
            </li>
            <li>
              <span>2 comments</span>
            </li>
          </SocialCounts>
          <SocialActions>
            <button>
              <ThumbUpIcon />
              <span>Like </span>
            </button>
            <button>
              <ModeCommentIcon />
              <span>Comment</span>
            </button>
            <button>
              <ShareIcon />
              <span>Share</span>
            </button>
            <button>
              <SendIcon />
              <span>Send</span>
            </button>
          </SocialActions>
        </Article>
      ))}
      <PostModal showModal={showModal} handleClick={handleClick} />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: reltive;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        background-color: white;
        text-align: left;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;
const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow:hidden;
  color; rgba(0,0,0,0.9);
  font-size:14px;
  text-align:left;
`;

const SharedImg = styled.div`
    margin-top:8px;
    width:100%;
display:block;
position:relative;
background-color:#f9fafb;
img{
  object-fit:contain;
  width:100%;
  height:100%:
}
  `;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      background: transparent;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    border: none;
    display: inline-flex;
    align-items: center;
    padding: 8px;
    background: transparent;
    color: grey;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

export default Main;
