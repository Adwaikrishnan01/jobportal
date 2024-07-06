const SkeletonJobCard = () => {
    return (
      <div className="bg-white p-6 rounded animate-pulse-lg max-w-2xl shadow-md my-6">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="h-6 w-48 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="h-8 w-8 bg-purple-300 rounded animate-pulse"></div>
        </div>
        
        <div className="mt-4 flex space-x-4">
          <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
        </div>
        
        <div className="mt-5 h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
        
        <div className="mt-6 flex space-x-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-6 w-20 bg-gray-300 rounded animate-pulse"></div>
          ))}
        </div>
        
        <div className="mt-5 flex justify-between items-center">
          <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
          <div className="flex space-x-2 mt-5">
            <div className="h-6 w-12 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-12 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      
    );
  };
  
  export default SkeletonJobCard;