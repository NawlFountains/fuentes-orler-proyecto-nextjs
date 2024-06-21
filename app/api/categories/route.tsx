import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
    
    try {
        const result = await sql.query(`
            SELECT DISTINCT
        category
      FROM products
        `);

        
        const categories = result.rows.map((row) => row.category);
        return NextResponse.json({ categories });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}