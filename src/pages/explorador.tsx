import dynamic from "next/dynamic";

const DynamicExplorador = dynamic(
  async () =>
    await import(
      "@/Components/Explorador/ExploradorContent/ExploradorContent"
    ).then((module) => module.Explorador)
);

const ExploradorPage = () => {
  return <DynamicExplorador />;
};

export default ExploradorPage;
