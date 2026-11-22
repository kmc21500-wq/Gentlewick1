import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const root = process.cwd();
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const env = readFileSync(join(root, '.env.example'), 'utf8');
const required = ['build', 'typecheck', 'lint', 'test:smoke'];
const missing = required.filter((name) => !pkg.scripts?.[name]);
const files = [
  'vercel.json', 'public/manifest.webmanifest', 'src/routes/privacy.tsx',
  'src/routes/account.tsx', 'src/routes/create.tsx', 'src/routes/memorials.tsx',
  'src/routes/candle.tsx', 'src/routes/orders.tsx', 'supabase/migrations/202611220001_gentlewick_backend.sql',
  'GENTLEWICK_FINAL_SETUP.md', 'LAUNCH_QA.md',
];
const absent = files.filter((f) => !existsSync(join(root, f)));
const envNames = ['VITE_PUBLIC_HOSTNAME', 'VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
const missingEnvDocs = envNames.filter((name) => !env.includes(name));
console.log('Gentlewick launch audit');
console.log(missing.length ? `Missing package scripts: ${missing.join(', ')}` : 'PASS: required package scripts exist');
console.log(absent.length ? `Missing files: ${absent.join(', ')}` : 'PASS: core routes/config/setup docs exist');
console.log(missingEnvDocs.length ? `Missing environment documentation: ${missingEnvDocs.join(', ')}` : 'PASS: environment variables documented');
if (missing.length || absent.length || missingEnvDocs.length) process.exitCode = 1;
