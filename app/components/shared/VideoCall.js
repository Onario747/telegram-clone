"use client";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { IoClose, IoMicOff, IoMic, IoVideocamOff, IoVideocam } from "react-icons/io5";
import styles from "./VideoCall.module.css";

export function VideoCall({ chatId, onEnd }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    initializeVideoCall();
    return () => {
      cleanupVideoCall();
    };
  }, []);

  const initializeVideoCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const configuration = {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" }
        ]
      };
      
      peerConnection.current = new RTCPeerConnection(configuration);
      
      stream.getTracks().forEach(track => {
        peerConnection.current.addTrack(track, stream);
      });

      peerConnection.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const cleanupVideoCall = () => {
    if (localVideoRef.current?.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    peerConnection.current?.close();
  };

  const toggleMute = () => {
    if (localVideoRef.current?.srcObject) {
      const audioTracks = localVideoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const videoTracks = localVideoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  return (
    <div className={styles.videoCall}>
      <div className={styles.controls}>
        <button onClick={toggleMute} className={styles.controlButton}>
          {isMuted ? <IoMicOff /> : <IoMic />}
        </button>
        <button onClick={toggleVideo} className={styles.controlButton}>
          {isVideoOff ? <IoVideocamOff /> : <IoVideocam />}
        </button>
        <button onClick={onEnd} className={styles.endCall}>
          <IoClose />
        </button>
      </div>
      <div className={styles.videos}>
        <Webcam
          ref={localVideoRef}
          mirrored
          className={styles.localVideo}
          audio={false}
        />
        <video
          ref={remoteVideoRef}
          className={styles.remoteVideo}
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
} 