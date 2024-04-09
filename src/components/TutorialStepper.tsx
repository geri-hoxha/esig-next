"use client";

import React, { useEffect, useState } from "react";
 

import dynamic from 'next/dynamic'

const Joyride = dynamic(
  () => import('react-joyride'),
  { ssr: false }
)
const TutorialStepper = () => {
   return (
    <>
     <Joyride
     run
        steps={[{ target: '#first-step', content: 'Click it bud' }]}
      />
      <button id="first-step">
        Click me
      </button>
    </>
   )
};

export default TutorialStepper;
