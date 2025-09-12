import { CLOUDINARY_CLOUD_NAME, GITHUB_USERNAME } from "./consts";

type OGImageOptions = {
  title: string;
  meta: string;
};

function escape(str: string) {
  return encodeURIComponent(encodeURIComponent(str));
}

export function createOgImage({ title, meta }: OGImageOptions) {
  return [
    `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    // Image Transformations
    "w_1600,h_836,q_100",

    // Title
    `l_text:Roboto_72_bold:${escape(title)},co_rgb:000000,c_fit,w_1400,h_240`,
    // Positioning
    "fl_layer_apply,g_south_west,x_100,y_180",

    // Meta
    `l_text:Roboto_48:${escape(meta)},co_rgb:36393B,c_fit,w_1400`,
    // Positioning
    "fl_layer_apply,g_south_west,x_100,y_100",

    // Profile image, dynamically fetched from GitHub profile
    `l_fetch:${btoa(`https://github.com/${GITHUB_USERNAME}.png`).replaceAll("=", "")}`,
    // Transformations
    "c_thumb,g_face,r_max,w_380,h_380,q_100",
    // Positioning
    "fl_layer_apply,w_140,g_north_west,x_100,y_100",

    // Background image
    "og_background.jpg",
  ].join("/");
}
