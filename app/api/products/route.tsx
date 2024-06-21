import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
    
    try {
        const result = await sql.query(`
            SELECT
                    * 
            FROM 
                products
                `);

        
        const products = result.rows;
        return NextResponse.json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
    }
}