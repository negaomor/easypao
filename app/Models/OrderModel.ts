class OrderCalculate extends BaseModel {
    Products: Array<ProductModel>;
    OrderType: number;
    DeliveryTime: number;
    SubscribedType: number;
    DaysOfWeek: Array<number>;
}

class Order {
    products: Array<Object>;
    //valor: number;
    //valorUnitario: number;
    //valorPromocao: number;
    //quantidade: number;
    //dtEntrega: Date;
    //diasSemana: string;
    //diasSemanaDescricao: string;
    //horarioEntrega: number;
    //primeiraCompra: boolean;
    //assinatura: number;
    //cupom: string;
    subscribePlan: number;
    //orderType: number; 
    deliveryTime: number;
    email: string;
    //daysOfWeek: Array<number>;
    deliveryDate: Date;
}