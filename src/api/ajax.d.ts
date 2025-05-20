export interface HistorySearch {
    skip: number;
    limit: number;
    startDate: string;
    endDate: string;
    hide: boolean;
}

export interface HistoryMeGet {
    skip: number;
    limit: number;
}

export interface RobotMission {
    rid: string;
    skip: number;
    limit: number;
}

export interface Mission {
    Mid: string;
    Path: string[];
    Start_time: string;
    Finish_time: string;
    M_status: number;
    Robot_id: string;
    Owner_id: string;
}

export interface HistoryResponse {
    status: string;
    data: Mission[]
}

export interface NLP {
    reply: string;
}
