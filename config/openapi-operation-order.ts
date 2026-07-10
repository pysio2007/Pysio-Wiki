export const blogApiOperations = [
  'get /',
  'get /fastfetch',
  'post /heartbeat',
  'get /check',
  'get /check/svg',
  'get /random_image',
  'get /images/count',
  'get /images/list',
  'post /images/add',
  'get /images/{hash}',
  'delete /images/{hash}',
  'get /i/{hash}',
  'get /steam_status',
  'get /ipcheck',
  'get /api_stats',
  'get /api_stats/{key}',
  'get /cloudflare_stats',
  'get /404',
  'get /50x',
  'post /admin/refcache',
  'get /github/{path}',
  'get /gitlab/{path}',
  'get /githubapi/{path}'
] as const

export const fileApiOperations = [
  'get /Avatar/{path}',
  'get /Pysio-FontAwesome/{path}',
  'get /api/files/sync/status',
  'get /api/files/{path}',
  'get /Images/{path}',
  'get /status/summary.json',
  'patch /{bucket}/{path}',
  'get /{path}'
] as const

export const whoisApiOperations = [
  'get /ip/{ip}',
  'options /ip/{ip}',
  'get /asn/{asn}',
  'options /asn/{asn}',
  'get /domain/{domain}',
  'options /domain/{domain}'
] as const
