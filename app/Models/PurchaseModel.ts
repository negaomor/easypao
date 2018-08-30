class PurchaseModel {
    address: AddressModel;
    products: ProductModel[];
    name: string;
    lastname: string;
    email: string;
    documentId: string;
    password: string;
    confirmpassword: string;
    discount: boolean;
    express: boolean;
    deliveryTime: number;
    deliveryDate: Date;
    status: number;
}