export default function DeliveryCard(){
    const deliveryTime = 1; 

    function calculatedDeliveryDate(){
        const current = new Date();
        const dayOfWeek = current.getDay();
        
        const isFriday = dayOfWeek === 5;
        const isWeekend = (dayOfWeek === 6) || (dayOfWeek  === 0);
        const nextMonday = current.getDate() + (((1 + 7 - current.getDay()) % 7) || 7);

        if(isWeekend){
            return `${nextMonday + deliveryTime}/${current.getMonth()+1}/${current.getFullYear()}`;
        }else if(isFriday){
            return `${nextMonday}/${current.getMonth()+1}/${current.getFullYear()}`;
        }else{
            return `${current.getDate() + deliveryTime}/${current.getMonth()+1}/${current.getFullYear()}`;
        }
    }

    return(
        <div className="border border-gray-300 rounded-xl p-3 mt-5 md:mb-5">
            <h1 className="font-Lato text-xl font-bold text-main-text-color">Leveringsdatum</h1>
            <div className="mt-3">
                <h2 className="text-lg">{calculatedDeliveryDate()}</h2>
                <h3>08:00 - 18:00</h3>
            </div>
        </div>
    )
}