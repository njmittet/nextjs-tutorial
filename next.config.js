const prodCsp = `
  default-src 'none';
  script-src 'self';
  style-src 'self';
  connect-src 'self';
  img-src 'self' data:;
  frame-ancestors 'self';
  form-action 'self';
`;

const devCsp = `
  default-src 'self'; 
  style-src 'self' 'unsafe-inline'; 
  script-src 'self' 'unsafe-eval';
  img-src 'self' data:;
`;

const isProd = process.env.NODE_ENV === 'production';

const cspHeader = [
  {
    key: 'Content-Security-Policy-Report-Only',
    value: (isProd ? prodCsp : devCsp)
      // Replace any consecutive whitespace character with a single space.
      .replace(/\s{2,}/g, ' ')
      .trim(),
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: cspHeader,
      },
    ];
  },
};
