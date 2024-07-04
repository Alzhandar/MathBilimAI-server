// import { MilvusClient } from 'milvus-client';
// import { CollectionSchema } from 'milvus-client';

// const client = new MilvusClient('localhost:19530');

// const collectionSchema: CollectionSchema = {
//     name: 'pdf_vectors',
//     fields: [
//         {
//             name: 'id',
//             data_type: 'INT64',
//             is_primary_key: true,
//         },
//         {
//             name: 'vector',
//             data_type: 'FLOAT_VECTOR',
//             params: { dim: 768 },
//         },
//         {
//             name: 'text',
//             data_type: 'VARCHAR',
//             params: { max_length: 1024 },
//         },
//     ],
// };

// const createCollection = async () => {
//     await client.createCollection(collectionSchema);
// };

// const insertVectors = async (vectors: any[]) => {
//     await client.insert({
//         collection_name: 'pdf_vectors',
//         fields_data: vectors,
//     });
// };

// const searchVectors = async (query: number[]) => {
//     const results = await client.search({
//         collection_name: 'pdf_vectors',
//         query_records: [query],
//         topk: 10,
//         anns_field: 'vector',
//         param: { nprobe: 10 },
//     });
//     return results;
// };

// export { createCollection, insertVectors, searchVectors };
