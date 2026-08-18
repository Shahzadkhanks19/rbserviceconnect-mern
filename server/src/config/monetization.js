export const promotionProducts={
  'candidate-profile-boost':{audience:'candidate',targetType:'candidate-profile',name:'Profile Boost',description:'Increase recruiter visibility for an active candidate profile.',options:[{days:7,amount:199},{days:14,amount:349},{days:30,amount:599}]},
  'job-featured':{audience:'recruiter',targetType:'job',name:'Featured Job',description:'Highlight a role with featured placement across RB Service Connect.',options:[{days:7,amount:499},{days:14,amount:799},{days:30,amount:1299}]},
  'job-search-boost':{audience:'recruiter',targetType:'job',name:'Search Boost',description:'Give an active role priority placement in relevant job search results.',options:[{days:7,amount:399},{days:14,amount:649},{days:30,amount:999}]},
  'job-urgent':{audience:'recruiter',targetType:'job',name:'Urgent Hiring',description:'Add an urgent-hiring promotion to an active role.',options:[{days:7,amount:299},{days:14,amount:499}]},
};

export function publicPromotionCatalogue(audience){return Object.entries(promotionProducts).filter(([,product])=>product.audience===audience).map(([id,product])=>({id,...product}));}
