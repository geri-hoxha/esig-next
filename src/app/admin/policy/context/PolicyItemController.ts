import { plainToClass } from "class-transformer";
import { OverwrittenIssueRequest } from ".";
import { PolicyItemCoverageRequest, PolicyItemInsuredObjectRequest, PolicyItemRequest } from "../type";
import { CREATE, DELETE, IAction, UPDATE } from "./reducer";
import PolicyItemRequestModel from "../models/PolicyItemRequestModel";
import Guid from "../Guid";
import AddressModel from "../models/Address";

type ReturnType = IAction<OverwrittenIssueRequest>

class PolicyItemController {

    private item: PolicyItemRequest;

    constructor(item: PolicyItemRequest) {
        this.item = item;
    }

    public static createItem(index: number): ReturnType {
        return {
            type: CREATE,
            payload: {
                key: "items",
                item: plainToClass(PolicyItemRequestModel, { text: index }),
            },
        }
    }

    public updateItem(data: PolicyItemRequest = this.item): ReturnType {
        return {
            type: UPDATE,
            payload: {
                key: "items",
                item: plainToClass(PolicyItemRequestModel, data),
                identifier: {
                    key: 'text',
                    value: this.item.text
                }
            },
        }
    }

    public deleteItem(): ReturnType {
        return {
            type: DELETE,
            payload: {
                key: 'items',
                identifier: { key: 'text', value: this.item.text },
            },
        }
    }

    public setTemplateItem(productTemplateId: string): ReturnType {
        return this.updateItem({
            ...this.item,
            productTemplateId
        })
    }

    public setCoverages(coverages: PolicyItemCoverageRequest[]): ReturnType {
        return this.updateItem({
            ...this.item,
            coverages
        })
    }

    public createInsuredObject<T>(object: PolicyItemInsuredObjectRequest<T>['object'], objectValue: number = 0, objectType: string = PolicyItemRequestModel.modelParameter?.objectType || ''): ReturnType {
        return this.updateItem({
            ...this.item,
            insuredObjects: [
                ...this.item.insuredObjects,
                {
                    id: Guid.create(),
                    objectValue,
                    object,
                    objectType
                }
            ]
        })
    }

    public updateInsuredObject<T>(idToUpdate: string, updatedObject: PolicyItemInsuredObjectRequest<T>['object']): ReturnType {

        const objectToUpdate = this.item.insuredObjects.find((insuredObject) => insuredObject.id === idToUpdate);

        if (!objectToUpdate) {
            throw new Error(`Insured object with id: ${idToUpdate} not found!`)
        }

        return this.updateItem({
            ...this.item,
            insuredObjects: [
                ...this.item.insuredObjects.map((insuredObject) => {
                    if (insuredObject.id === idToUpdate) {
                        return {
                            ...insuredObject,
                            object: updatedObject
                        };
                    }

                    return insuredObject
                })
            ]
        })
    }

    public deleteInsuredObject(id: string): ReturnType {
        return this.updateItem({
            ...this.item,
            insuredObjects: [
                ...this.item.insuredObjects.filter((insuredObject) => insuredObject.id !== id)
            ]
        })
    }

    public setRiskAddresses(riskAddresses: AddressModel): ReturnType {
        return this.updateItem({
            ...this.item,
            riskAddresses: [riskAddresses]
        })
    }
}

export default PolicyItemController;