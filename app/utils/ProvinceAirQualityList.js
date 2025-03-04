import { useEffect, useState } from "react";

export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

export default function ProvinceAirQualityList({ airQualityData, userLat, userLon }) {
    const [sortedData, setSortedData] = useState([]);

    useEffect(() => {
        if (userLat && userLon && airQualityData.length > 0) {
            const dataWithDistance = airQualityData.map((provinceData) => ({
                ...provinceData,
                distance: calculateDistance(userLat, userLon, provinceData.lat, provinceData.long),
            }));

            const sorted = dataWithDistance.sort((a, b) => a.distance - b.distance);
            setSortedData(sorted);
        }
    }, [userLat, userLon, airQualityData]);

    return (
        <>
            {sortedData.length > 0 ? (
                sortedData.map((provinceData, index) => (
                    <div key={index} className="border rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-bold">
                            Province: {provinceData.province || "No data"}
                        </h2>
                        <p className="text-sm text-gray-600">
                            Date: {provinceData.date || "No date"} | Time:{" "}
                            {provinceData.time || "No time"}
                        </p>
                        <p className="text-sm">
                            Latitude: {provinceData.lat || "No lat"}, Longitude:{" "}
                            {provinceData.long || "No long"}
                        </p>
                        <p className="text-sm">
                            Number of Stations: {provinceData.stationCount || "No stations"}
                        </p>
                        <p className="text-sm font-medium">
                            AQI: <span>{provinceData.AQI || "No AQI"}</span>
                        </p>
                        <p className="text-sm font-medium">
                            PM2.5 AQI: <span>{provinceData.pm25Aqi || "No PM2.5 AQI"}</span>
                        </p>
                        <h4 className="text-sm font-semibold mt-2">Pollutant Averages:</h4>
                        <ul className="list-disc pl-5">
                            {provinceData.pollutantAverages ? (
                                Object.entries(provinceData.pollutantAverages).map(
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
                ))
            ) : (
                <p className="text-center text-gray-500">Loading data...</p>
            )}
        </>
    );
}
