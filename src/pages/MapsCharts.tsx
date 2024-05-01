import LineGraph from "../components/LineGraph";
import LeafLetMap from "../components/LeafLetMap";
const MapsCharts = () => {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-darkColorTwo px-2 md:px-5 py-8">
            <p className=" text-accentWhite text-center mb-4 italic text-sm">For Better understanding the Charts, Please Open in Laptop/PC </p>
            <p className="text-center text-2xl text-accentWhite mb-4">COVID-19 cases Date-wise</p>
            <LineGraph />
            <p className="text-center text-2xl text-accentWhite mb-4">COVID-19 cases Country-wise</p>
            <LeafLetMap />
        </div>
    )
}
export default MapsCharts;