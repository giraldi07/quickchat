import React, { useState, useEffect } from 'react';
import Peer from 'peerjs';

const Call = ({ roomId }) => {
  const [peer, setPeer] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    const peer = new Peer(); // Bisa sesuaikan ID Peer
    setPeer(peer);

    // Mendengarkan panggilan masuk
    peer.on('call', (incomingCall) => {
      incomingCall.answer(window.localStream); // Menghubungkan panggilan
      setCall(incomingCall);
    });

    // Memulai stream video lokal
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      window.localStream = stream;
      document.getElementById('myVideo').srcObject = stream;
    });

    return () => {
      if (peer) peer.destroy();
    };
  }, []);

  // Fungsi untuk memulai panggilan
  const startCall = (remotePeerId) => {
    const call = peer.call(remotePeerId, window.localStream);
    setCall(call);
    call.on('stream', (remoteStream) => {
      document.getElementById('remoteVideo').srcObject = remoteStream;
    });
  };

  return (
    <div>
      <video id="myVideo" autoPlay muted></video>
      <video id="remoteVideo" autoPlay></video>
      {/* Button untuk memulai panggilan */}
      <button onClick={() => startCall('peerIdTujuan')}>Start Call</button>
    </div>
  );
};

export default Call;
