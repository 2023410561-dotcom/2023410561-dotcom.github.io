// 媒体资源地址解析
// ---------------------------------------------------------------
// 默认情况下（本地开发 / 站点自托管）视频与封面走站内相对路径：
//   /videos/xxx.mp4   /posters/xxx.jpg
//
// 当把视频、封面上传到国内 CDN（如腾讯云 CloudBase 云存储）后，
// 只需在构建时注入环境变量：
//   VITE_VIDEO_CDN=https://你的域名
// 所有视频与封面地址就会自动指向 CDN，无需改动业务代码。
// ---------------------------------------------------------------

const CDN = (import.meta.env.VITE_VIDEO_CDN || '').replace(/\/+$/, '')

/**
 * 把作品数据里的相对视频地址（/videos/xxx.mp4）解析为最终播放地址。
 * 已是完整 URL（http/https）的原样返回。
 */
export function resolveVideo(src) {
  if (!src) return src
  if (/^https?:\/\//.test(src)) return src
  return CDN + src
}

/**
 * 从视频地址派生封面（poster）地址：
 * /videos/xxx.mp4  ->  /posters/xxx.jpg （视频在 CDN 时封面同样取自 CDN）
 */
export function videoPoster(src) {
  if (!src) return ''
  return resolveVideo(src).replace(/\.mp4$/, '.jpg').replace('/videos/', '/posters/')
}
