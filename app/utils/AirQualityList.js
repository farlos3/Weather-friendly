import { useEffect, useState } from "react";

// Calculate distance between two coordinates
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Distance in km
}

// Component to display a single region's data
function RegionCard({ regionData }) {
    return (
        <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-lg font-bold">
                Region: {regionData.region || "No data"}
            </h2>
            <p className="text-sm text-gray-600">
                Date: {regionData.date || "No date"} | Time:{" "}
                {regionData.time || "No time"}
            </p>
            <p className="text-sm">
                Latitude: {regionData.lat || "No lat"}, Longitude:{" "}
                {regionData.long || "No long"}
            </p>
            <p className="text-sm">
                Number of Stations: {regionData.stationCount || "No stations"}
            </p>
            <p className="text-sm font-medium">
                AQI: <span>{regionData.AQI || "No AQI"}</span>
            </p>
            <p className="text-sm font-medium">
                PM2.5 AQI: <span>{regionData.pm25Aqi || "No PM2.5 AQI"}</span>
            </p>
            <h4 className="text-sm font-semibold mt-2">Pollutant Averages:</h4>
            <ul className="list-disc pl-5">
                {regionData.pollutantAverages ? (
                    Object.entries(regionData.pollutantAverages).map(
                        ([pollutant, value], i) => (
                            <li key={i} className="text-sm">
                                {pollutant}: {value || "No data"}
                            </li>
                        )
                    )
                ) : (
                    <li className="text-sm">No pollutant data available</li>
                )}
            </ul>
        </div>
    );
}

export default function AirQualityList({ airQualityData, userLat, userLon }) {
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        if (userLat && userLon && airQualityData.length > 0) {
            const dataWithDistance = airQualityData.map((regionData) => ({
                ...regionData,
                distance: calculateDistance(
                    userLat,
                    userLon,
                    regionData.lat,
                    regionData.long
                ),
            }));

            setSortedData(
                dataWithDistance.sort((a, b) => a.distance - b.distance)
            );
        }
    }, [userLat, userLon, airQualityData]);

    return (
        <>
            {sortedData.length > 0 ? (
                sortedData.map((regionData, index) => (
                    <RegionCard key={index} regionData={regionData} />
                ))
            ) : (
                <p className="text-center text-gray-500">Loading data...</p>
            )}
        </>
    );
}


