import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // モノレポのルートにも package-lock.json があり、ワークスペースルートの自動検出が
  // 誤って一つ上の階層を指してしまうため明示的に固定する。
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
