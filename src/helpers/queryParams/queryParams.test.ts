import { CastMemberParams } from "../../types/CastMember";
import { CategoryParams } from "../../types/Category";
import { GenreParams } from "../../types/Genre";
import { parseQueryParams } from "./queryParams";

describe('queryParams', () => {

    it('should create the queries params for CastMemberParams', () => {
        const params: CastMemberParams = { page: 1, perPage: 10, search: "test" };
        const expectedQuery = 'page=1&per_page=10&search=test'
        const queries = parseQueryParams(params);
        expect(queries).toEqual(expectedQuery);
    });

    it('should create the queries params for CategoryParams', () => {
        const params: CategoryParams = { page: 1, perPage: 10, search: "test" };
        const expectedQuery = 'page=1&per_page=10&search=test'
        const queries = parseQueryParams(params);
        expect(queries).toEqual(expectedQuery);
    });

    it('should create the queries params for GenreParams', () => {
        const params: GenreParams = { page: 1, perPage: 10, search: "test" };
        const expectedQuery = 'page=1&per_page=10&search=test'
        const queries = parseQueryParams(params);
        expect(queries).toEqual(expectedQuery);
    });

    it('should not create query if param equal to {}', () => {
        const params = {};
        const expectedQuery = ''
        const queries = parseQueryParams(params);
        expect(queries).toEqual(expectedQuery);
    });

    it('should not create query if param equal to []', () => {
        const params: [] = [];
        const expectedQuery = ''
        const queries = parseQueryParams(params);
        expect(queries).toEqual(expectedQuery);
    });

    it('should not create query if param equal to undefined', () => {
        const params: any = [];
        const expectedQuery = ''
        const queries = parseQueryParams(params);
        expect(queries).toEqual(expectedQuery);
    });

    it('should not create query if param has null values', () => {
        const params: any = {page: null, perPage: null, search: null};
        const expectedQuery = ''
        const queries = parseQueryParams(params);
        expect(queries).toEqual(expectedQuery);
    });

    it('should not create query if param has undefined values', () => {
        const params: any = {page: undefined, perPage: undefined, search: undefined};
        const expectedQuery = ''
        const queries = parseQueryParams(params);
        expect(queries).toEqual(expectedQuery);
    });
});