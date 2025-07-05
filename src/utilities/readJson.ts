import path from 'path';
import {promises as fs} from 'fs';
import {Data} from '@/models/data';

export default async function readDataJSON(): Promise<Data> {
    const dataDirectory: string = path.join(process.cwd(), 'src/data');
    const data: string = await fs.readFile(`${dataDirectory}/data.json`, 'utf-8');
    return JSON.parse(data);
}


