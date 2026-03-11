import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { schema } from '@launchpad/shared';
import 'dotenv/config';

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
export type DB = typeof db;
