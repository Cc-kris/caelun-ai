import React from "react";
import { createRoot } from "react-dom/client";
import "antd/dist/reset.css";
import "./styles/globals.css";
import "./styles/shared/model-picker.css";
import "./styles/shared/overlays.css";
import "./styles/shared/scrollbars.css";
import "@/themes/load";
import { RouterProvider } from "react-router";

import { AppProviders } from "@/components/layout/app-providers";
import { router } from "@/router";
import { installSiteTrafficCollector } from "@/services/site-traffic";

// 登录弹窗由 router.tsx 的 AppRoot 渲染在路由上下文内（弹窗内的表单要用 useSearchParams/useLocation）。
// 不要把 AuthDialogHost 放回这里：它在 RouterProvider 之外，一打开就整页白屏。

document.body.style.fontFamily = '"SF Pro Display","SF Pro Text","PingFang SC","Microsoft YaHei","Helvetica Neue",sans-serif';

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppProviders>
            <RouterProvider router={router} />
        </AppProviders>
    </React.StrictMode>,
);

// 在 React 生命周期外安装，游客与 StrictMode 都共用一次路由订阅。
const disposeTraffic = installSiteTrafficCollector(router);
if (import.meta.hot) import.meta.hot.dispose(disposeTraffic);
