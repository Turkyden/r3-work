import React, { useRef, useState } from "react";
import { Canvas, MeshProps, useFrame } from "react-three-fiber";
import { useControls } from "leva";
import type { Mesh } from "three";
import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import "./styles.css";

/**
 * Tips
 * @param Canvas 画布
 * @param mesh 网格物体：组成几何图形的基本单位
 * @param - boxBufferGeometry 正方体：长x宽x高
 * @param - meshStandardMaterial 材质：表面颜色
 * @param useFrame 钩子-动画帧
 */

const Box: React.FC<MeshProps> = (props) => {
  const mesh = useRef<Mesh>();

  const { rotationX, rotationY, rotationZ } = useControls({
    rotationX: {
      value: 0,
      min: 0,
      max: 365,
      step: 0.05
    },
    rotationY: {
      value: 0,
      min: 0,
      max: 365,
      step: 0.05
    },
    rotationZ: {
      value: 0,
      min: 0,
      max: 365,
      step: 0.05
    }
  });

  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current)
      mesh.current.rotation.x = mesh.current.rotation.y += 0.004;
  });

  return (
    <group ref={mesh}>
      <mesh
        {...props}
        onPointerMove={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
        scale={[1, 1, 1]}
        rotation={[Math.PI / 2, 0, 0]}
        // onClick={(event) => setActive(!active)}
      >
        <boxBufferGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
      <ToolTip1 />
      <ToolTip2 />
      <ToolTip3 />
    </group>
  );
};

function ToolTip1() {
  return (
    <Html center position={[-1, 1, -1]}>
      <div className="border border-solid border-green-300 p-4 w-48 bg-green-500 bg-opacity-25">
        <p className="text-green-300 text-base">项目验收金额</p>
        <p className="text-xl text-white">8,123,465</p>
        <p>
          <span className="text-gray-500">同比</span>{" "}
          <span className="text-red-500">14</span>
        </p>
      </div>
    </Html>
  );
}

function ToolTip2() {
  return (
    <Html center position={[1, -1, -1]}>
      <div className="border border-solid border-green-300 p-4 w-48 bg-green-500 bg-opacity-25">
        <p className="text-green-300 text-base">项目验收金额</p>
        <p className="text-xl text-white">8,123,465</p>
        <p>
          <span className="text-gray-500">同比</span>{" "}
          <span className="text-red-500">14</span>
        </p>
      </div>
    </Html>
  );
}

function ToolTip3() {
  return (
    <Html center position={[-1, -1, 1]}>
      <a href="https://www/baidu.com" target="_blank">
        <div className="border border-solid border-green-300 p-4 w-48 bg-green-500 bg-opacity-25">
          <p className="text-green-300 text-base">项目验收金额</p>
          <p className="text-xl text-white">8,123,465</p>
          <p>
            <span className="text-gray-500">同比</span>{" "}
            <span className="text-red-500">14</span>
          </p>
        </div>
      </a>
    </Html>
  );
}
export default function App() {
  return (
    <div className="w-screen h-screen flex flex-col jutify-center items-center bg-gray-900">
      <h2 className="text-4xl text-white py-2">3D Cube</h2>
      <Canvas style={{ height: "100vh", width: "100vw" }}>
        <ambientLight />
        <pointLight position={[4, 4, 4]} />
        <PerspectiveCamera position={[1, 1, 1]} makeDefault />
        <OrbitControls />
        {/* All these are in the same group */}
        <Box position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}
