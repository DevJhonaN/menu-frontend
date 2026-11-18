import { Button } from "@base-ui/react";
import { MapPin } from "lucide-react";
import { SpotDialog } from "./spot-dialog";
import { useState } from "react";
import type { SpotDTO } from "../dtos/spot.dto";

export function SpotButton(){

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedSpot, setSelectedSpot] = useState<SpotDTO | null>(() => {
        const spotStorage = localStorage.getItem('spot')
        return spotStorage ? JSON.parse(spotStorage) : null;
    });

    function hendleSelect(spot: SpotDTO){
        localStorage.setItem('spot', JSON.stringify(spot));
        setSelectedSpot(spot);
        setDialogOpen(false);
    }

    return (
        <div className="flex items-center justify-end">
            <Button
            className="flex cursor-pointer flex-col items-center gap-1 rounded-2xl border-2 border-[#B86A2C] bg-[#B86A2C] px-6 py-4 text-white transition-colors hover:bg-[#a55d25] hover:text-white"
            onClick={() => setDialogOpen(true)}
            >
                <MapPin className="size-6" />
                { selectedSpot ? selectedSpot.name : 'Selecionar mesa' }
            </Button>

            <SpotDialog 
                open={dialogOpen}  
                onSelect={hendleSelect}
                selectedSpotId={selectedSpot?.id}
            />
        </div>
    )
}