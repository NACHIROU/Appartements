// ApartmentList.jsx
import ApartmentCard from "./ApartmentCard";

const ApartmentList = ({ apartments, onDelete, onEdit }) => {
  return (
    <div className="container">
      {apartments?.map((apartment, i) => (
    <div key={apartment.id} className="apartment">
    <ApartmentCard
      apartment={apartment}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  </div>
      ))}
    </div>
  );
};

export default ApartmentList;
