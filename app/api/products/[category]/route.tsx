import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    
    const url = new URL(req.url);
    const category = url.pathname.split('/').pop(); // Extract the category from the URL

    if (!category) {
        return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    try {
        const result = await sql.query(`
            SELECT 
                *
            FROM 
                products
            WHERE
                category = $1;
        `, [category]);

        const categories = result.rows;
        return NextResponse.json({ categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
    }
}
