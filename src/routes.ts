import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route("/", "routes/_index.tsx"),
    route("/CreateYourDream", "routes/create-your-dream.tsx"),
] satisfies RouteConfig;
