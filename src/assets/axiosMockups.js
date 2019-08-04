import axios from 'axios';
import * as URL from 'assets/urls.js';
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';

const mock = new MockAdapter(axios,{ delayResponse: 500 });
// const mockPost = new MockAdapter(axios, );

const axiosMockups = () => {

    mock.onGet(URL.groups).reply(200,
        [{ "GroupName": "Podstawowy", "GroupID": 1 },
        { "GroupName": "Zniżka 5%", "GroupID": 2 }]
    );
    mock.onGet(URL.reservations).reply(200,
        [{ "UID": "5d90ae15-614e-4779-ae76-0ada38da70d3", "ParentUID": "5d90ae15-614e-4779-ae76-0ada38da70d3", "TreatmentUID": "2ecfd412-f12e-46cb-94e5-d9c14238b56f", "ClientUID": "20c1149b-c79a-4180-9a80-ca4885a3cafb", "UserUID": "4634b14a-67ea-4065-9bfa-df2fe1020591", "LoggedUID": "4634b14a-67ea-4065-9bfa-df2fe1020591", "Description": "Opis pierwszego zabiegu", "TreatmentDate": moment().set('hour', 11).set('minute', 0), "ModifyDate": "2019-08-02T18:46:40.000Z", "EndDate": moment().set('hour', 11).add(30, 'm').toDate(), "DurationInMinutes": 30, "OfficeID": 1, "IsTreatmentDone": false, "IsTreatmentCancel": false, "Cost": 120, "PaymentMethod": "", "TreatmentName": "Zabieg 1", "ClientName": "Jan Nowak", "WhoDoneTreatment": "Karolina Las" },
        { "UID": "467790c9-2fee-4316-a5c3-58f388376531", "ParentUID": "467790c9-2fee-4316-a5c3-58f388376531", "TreatmentUID": "8aba853d-a872-44c3-b3a8-75cc27cfa9cf", "ClientUID": "caa93bb3-81ee-4f79-9b82-66ca1332afcd", "UserUID": "bbe68742-d770-4b9f-8433-e8a5a8f47571", "LoggedUID": "bbe68742-d770-4b9f-8433-e8a5a8f47571", "Description": "Opis drugiego zabiegu", "TreatmentDate": moment().set('hour', 11).set('minute', 15), "ModifyDate": "2019-08-02T18:47:01.000Z", "EndDate": moment().set('hour', 11).add(45, 'm').toDate(), "DurationInMinutes": 45, "OfficeID": 2, "IsTreatmentDone": false, "IsTreatmentCancel": false, "Cost": 160, "PaymentMethod": "", "TreatmentName": "Zabieg 2", "ClientName": "Anna Kowalska", "WhoDoneTreatment": "Andrzej Czerstwy" }]
    );
    mock.onGet(URL.treatments).reply(200,
        {
            "treatments":
                [{ "UID": "2ecfd412-f12e-46cb-94e5-d9c14238b56f", "Name": "Zabieg 1" },
                { "UID": "8aba853d-a872-44c3-b3a8-75cc27cfa9cf", "Name": "Zabieg 2" }],
            "users":
                [{ "UID": "4634b14a-67ea-4065-9bfa-df2fe1020591", "FullName": "Karolina Las" },
                { "UID": "bbe68742-d770-4b9f-8433-e8a5a8f47571", "FullName": "Andrzej Czerstwy" }],
            "offices":
                [{ "OfficeID": 1, "OfficeName": "Gabinet 1", "Active": true },
                { "OfficeID": 2, "OfficeName": "Gabinet 2", "Active": true }]
        }
    );
    mock.onGet(/^[\/]clients[\/]search.*/).reply(200,
        {
            "NameList": [
                { "UID": "caa93bb3-81ee-4f79-9b82-66ca1332afcd", "Description": "+48505606707", "Searched": "Anna Kowalska" },
                { "UID": "92c1bc5f-e625-4f30-94e7-3f6bdbca4d6f", "Description": "+48667788968", "Searched": "Anna Lewandowska" },
        { "UID": "20c1149b-c79a-4180-9a80-ca4885a3cafb", "Description": "+48600700800", "Searched": "Jan Nowak" }], "PhoneList": [
                { "UID": "20c1149b-c79a-4180-9a80-ca4885a3cafb", "Description": "Jan Nowak", "Searched": "+48600700800" }, { "UID": "caa93bb3-81ee-4f79-9b82-66ca1332afcd", "Description": "Anna Kowalska", "Searched": "+48505606707" }, { "UID": "92c1bc5f-e625-4f30-94e7-3f6bdbca4d6f", "Description": "Anna Lewandowska", "Searched": "+48667788968" }
            ], "EmailList": [
                { "UID": "20c1149b-c79a-4180-9a80-ca4885a3cafb", "Description": "Jan Nowak", "Searched": "jnowak@gmail.com" },
                { "UID": "caa93bb3-81ee-4f79-9b82-66ca1332afcd", "Description": "Anna Kowalska", "Searched": "akowalska@gmail.com" },
                { "UID": "92c1bc5f-e625-4f30-94e7-3f6bdbca4d6f", "Description": "Anna Lewandowska", "Searched": "al@gmail.com" }
            ]
        }
    );
    mock.onGet(URL.clients+"/20c1149b-c79a-4180-9a80-ca4885a3cafb").reply(200,
        {"id":3,"UID":"20c1149b-c79a-4180-9a80-ca4885a3cafb","Login":null,"FirstName":"Jan","LastName":"Nowak","PhoneNumber":"+48600700800","Birthday":"1989-03-22T00:00:00.000Z","Group":"1","Email":"jnowak@gmail.com","TaxNumber":"","Company":"","PromotialInfoAgreement":false,"createdAt":"2019-08-02T18:41:39.000Z","updatedAt":"2019-08-02T18:41:39.000Z"}
    );
    mock.onGet(URL.clientsStats+"/20c1149b-c79a-4180-9a80-ca4885a3cafb").reply(200,
        {"TreatmentCount":1,"TreatmentDoneCount":"0","TreatmentUndoneCount":"1","TreatmentCost":121,"DoneTreatmentCost":0,"UndoneTreatmentCost":121,"AverageCost":121,"AverageCostDoneTreatment":null,"AverageCostUndoneTreatment":121,"ClientUID":"20c1149b-c79a-4180-9a80-ca4885a3cafb"}
    );
    mock.onGet(URL.doneTreatment+"/20c1149b-c79a-4180-9a80-ca4885a3cafb").reply(200,
        [{"UID":"819bba79-17be-4bcc-8f61-ac7c671c14c0","ParentUID":"5d90ae15-614e-4779-ae76-0ada38da70d3","TreatmentUID":"2ecfd412-f12e-46cb-94e5-d9c14238b56f","ClientUID":"20c1149b-c79a-4180-9a80-ca4885a3cafb","UserUID":"4634b14a-67ea-4065-9bfa-df2fe1020591","LoggedUID":"4634b14a-67ea-4065-9bfa-df2fe1020591","Description":"Opis pierwszego zabiegu","TreatmentDate":"2019-08-14T22:00:00.000Z","ModifyDate":"2019-08-03T14:41:08.000Z","EndDate":"2019-08-14T22:30:00.000Z","DurationInMinutes":30,"OfficeID":1,"IsTreatmentDone":false,"IsTreatmentCancel":false,"Cost":121,"PaymentMethod":"","TreatmentName":"Zabieg 1","ClientName":"Jan Nowak","WhoDoneTreatment":"Karolina Las"}]
    );
    mock.onGet(URL.clients+"/caa93bb3-81ee-4f79-9b82-66ca1332afcd").reply(200,
        {"id":4,"UID":"caa93bb3-81ee-4f79-9b82-66ca1332afcd","Login":null,"FirstName":"Anna","LastName":"Kowalska","PhoneNumber":"+48505606707","Birthday":"1991-02-14T00:00:00.000Z","Group":"1","Email":"akowalska@gmail.com","TaxNumber":"1234563218","Company":"SuperFirma","PromotialInfoAgreement":false,"createdAt":"2019-08-02T18:43:20.000Z","updatedAt":"2019-08-02T18:43:20.000Z"}
    );
    mock.onGet(URL.clientsStats+"/caa93bb3-81ee-4f79-9b82-66ca1332afcd").reply(200,
        {"TreatmentCount":1,"TreatmentDoneCount":"1","TreatmentUndoneCount":"0","TreatmentCost":160,"DoneTreatmentCost":160,"UndoneTreatmentCost":0,"AverageCost":160,"AverageCostDoneTreatment":160,"AverageCostUndoneTreatment":null,"ClientUID":"caa93bb3-81ee-4f79-9b82-66ca1332afcd"}
    );
    mock.onGet(URL.doneTreatment+"/caa93bb3-81ee-4f79-9b82-66ca1332afcd").reply(200,
        [{"UID":"5a1415f5-52b7-49da-a87d-48809d7d003c","ParentUID":"467790c9-2fee-4316-a5c3-58f388376531","TreatmentUID":"8aba853d-a872-44c3-b3a8-75cc27cfa9cf","ClientUID":"caa93bb3-81ee-4f79-9b82-66ca1332afcd","UserUID":"bbe68742-d770-4b9f-8433-e8a5a8f47571","LoggedUID":"bbe68742-d770-4b9f-8433-e8a5a8f47571","Description":"Opis drugiego zabiegu","TreatmentDate":"2019-08-14T22:00:00.000Z","ModifyDate":"2019-08-03T14:39:33.000Z","EndDate":"2019-08-14T22:45:00.000Z","DurationInMinutes":45,"OfficeID":1,"IsTreatmentDone":true,"IsTreatmentCancel":false,"Cost":160,"PaymentMethod":"","TreatmentName":"Zabieg 2","ClientName":"Anna Kowalska","WhoDoneTreatment":"Andrzej Czerstwy"}]
    );
    mock.onGet(URL.clients+"/92c1bc5f-e625-4f30-94e7-3f6bdbca4d6f").reply(200,
        {"id":5,"UID":"92c1bc5f-e625-4f30-94e7-3f6bdbca4d6f","Login":null,"FirstName":"Anna","LastName":"Lewandowska","PhoneNumber":"+48667788968","Birthday":"1997-01-01T00:00:00.000Z","Group":"1","Email":"al@gmail.com","TaxNumber":"","Company":"","PromotialInfoAgreement":false,"createdAt":"2019-08-02T18:50:52.000Z","updatedAt":"2019-08-02T18:50:52.000Z"}
    );
    mock.onGet(URL.clientsStats+"/92c1bc5f-e625-4f30-94e7-3f6bdbca4d6f").reply(200,
        {"TreatmentCount":0,"TreatmentDoneCount":"0","TreatmentUndoneCount":"0","TreatmentCost":0,"DoneTreatmentCost":0,"UndoneTreatmentCost":0,"AverageCost":0,"AverageCostDoneTreatment":0,"AverageCostUndoneTreatment":0,"ClientUID":"caa93bb3-81ee-4f79-9b82-66ca1332afcd"}
    );
    mock.onGet(URL.doneTreatment+"/92c1bc5f-e625-4f30-94e7-3f6bdbca4d6f").reply(200,
        []
    );
    mock.onGet(URL.treatments+"/2ecfd412-f12e-46cb-94e5-d9c14238b56f").reply(200,
        {"UID":"2ecfd412-f12e-46cb-94e5-d9c14238b56f","Name":"Zabieg 1","Description":"Opis pierwszego zabiegu","DurationInMinutes":30,"Cost":120,"Products":[{"UID":"c2959365-c4fb-4077-ad7c-28d66a1d1b2e","Name":"Mleko","Unit":"ml","Quantity":0},{"UID":"843f2bb2-f113-460a-9835-222686179bd9","Name":"Mąka","Unit":"g","Quantity":0},{"UID":"ff03602c-1d8a-47b4-9f13-5027ab339ddc","Name":"Jajka","Unit":"g","Quantity":0},{"UID":"561144a4-26fb-471c-8ee3-efbb51765496","Name":"Woda","Unit":"ml","Quantity":0},{"UID":"7f44c8d3-28a8-45c2-bea6-594f9942a83c","Name":"Sól","Unit":"g","Quantity":0}]}
    );
    mock.onGet(URL.treatments+"/8aba853d-a872-44c3-b3a8-75cc27cfa9cf").reply(200,
        {"UID":"8aba853d-a872-44c3-b3a8-75cc27cfa9cf","Name":"Zabieg 2","Description":"Opis drugiego zabiegu","DurationInMinutes":45,"Cost":160,"Products":[{"UID":"c2959365-c4fb-4077-ad7c-28d66a1d1b2e","Name":"Mleko","Unit":"ml","Quantity":0},{"UID":"843f2bb2-f113-460a-9835-222686179bd9","Name":"Mąka","Unit":"g","Quantity":0},{"UID":"ff03602c-1d8a-47b4-9f13-5027ab339ddc","Name":"Jajka","Unit":"g","Quantity":0},{"UID":"561144a4-26fb-471c-8ee3-efbb51765496","Name":"Woda","Unit":"ml","Quantity":0},{"UID":"7f44c8d3-28a8-45c2-bea6-594f9942a83c","Name":"Sól","Unit":"g","Quantity":0}]}
    );
    mock.onPost(/.*/).reply(200, true)
    mock.onPut(/.*/).reply(200, true)
    // mock.onGet(URL.clientsSearch).reply(200,
    //   [{ "GroupName": "Podstawowy", "GroupID": 1 },
    //   { "GroupName": "Zniżka 5%", "GroupID": 2 }]
    // );
}

export default axiosMockups