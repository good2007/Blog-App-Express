import { getBlogs } from "@/app/actions";
import fs from "fs/promises";
import path from "path";


const dbPath = path.join(process.cwd(), "lib", "db.json");


