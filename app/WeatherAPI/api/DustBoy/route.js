import { NextResponse } from 'next/server';

export async function GET(request) {
    const url = "https://www.cmuccdc.org/api/ccdc/stations";

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            },
        });

        const data = await response.json();

        if (response.ok) {
            return NextResponse.json(data, { status: 200 });
        } else {
            return NextResponse.json(
                { error: data.message || 'Unknown error' },
                { status: response.status }
            );
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}