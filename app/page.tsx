// Import necessary components
import { CardTitle, PieChart } from 'some-chart-library';
import { useData } from 'some-data-source';

const ChartsRow = () => {
    // Assume smallGroups is fetched from a data source
    const smallGroupsData = useData('smallGroups');

    // Aggregate smallGroups by zone
    const aggregatedData = smallGroupsData.reduce((acc, group) => {
        const zone = group.zone;
        if (!acc[zone]) {
            acc[zone] = 0;
        }
        acc[zone] += 1;
        return acc;
    }, {});

    // Convert aggregated data to required format for PieChart
    const pieData = Object.entries(aggregatedData).map(([zone, count]) => ({ zone, count }));

    return (
        <div>
            <CardTitle>Small Groups by Zone</CardTitle>
            <PieChart data={pieData} />
        </div>
    );
};

export default ChartsRow;