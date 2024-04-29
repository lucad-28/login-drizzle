import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';

import * as schema from '../../../drizzel/schema';

export const db = drizzle(createClient({ url: 'file:drizzel/dev.db' }), { schema });

migrate(db, { migrationsFolder: 'drizzle' });