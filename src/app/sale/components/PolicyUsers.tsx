'use client';
import Participants from "@/components/esig/Participants";

export default function PolicyUsers() {
  return (
    <Participants
      title="Policy Users"
      customRenderer={(participant) => {
        return <div className="ml-3">20%</div>
      }}
      participants={[
        {
          id: "1",
          displayName: "Agim Molla",
        },
        {
          id: "2",
          displayName: "Filan Fisteku",
        },
        {
          id: "3",
          displayName: "Fiqiri Bobi",
        },
        {
          id: "4",
          displayName: "Agim Molla",
        },
        {
          id: "5",
          displayName: "Filan Fisteku",
        },
        {
          id: "6",
          displayName: "Fiqiri Bobi",
        },

        {
          id: "7",
          displayName: "Agim Molla",
        },
        {
          id: "8",
          displayName: "Filan Fisteku",
        },
        {
          id: "9",
          displayName: "Fiqiri Bobi",
        },
        {
          id: "10",
          displayName: "Agim Molla",
        },
        {
          id: "11",
          displayName: "Filan Fisteku",
        },
        {
          id: "12",
          displayName: "Fiqiri Bobi",
        },
      ]}
    />
  );
}
