import  oracledb from 'oracledb';
//const dbconfig = ;
 oracledb.createPool({ 
    user: "GRAPHQLUSER",
    password      : "fC8E5peW3MJ56LQV3w6y8hr9Z",
    connectString : "E1PD"
  });

async function getAllCustomers() {
    let sql = `SELECT '{"id":"'|| aban8||'","nombre":"'||trim(abalph)||'","rut":"'||trim(abtax)||'"}' FROM proddta.f0101 
          join proddta.f44h501 on smbyr=aban8 and smactvseq='1'
          where abat1='C' order by abalph`;
    //let binds = [id];
    let conn = await oracledb.getConnection();
    
    return await conn.execute(sql)
    .then(result =>{
      let parseResult = [];
      result.rows.forEach(row=>{
        //console.log('OBJECT', JSON.stringify(it[0]));
        try {
          let rowItem = JSON.parse(row[0]);  
          parseResult.push(rowItem);
        } catch (error) {
          console.log('Problems with', row[0]);
        }
      });
      conn.close();
      return parseResult;
    });
  }

async function getOneCustomer(id) {
    let sql = `SELECT '{"id":"'|| aban8||'","nombre":"'||trim(abalph)||'","rut":"'||trim(abtax)||'"}'
                FROM proddta.f0101 where aban8=:id order by abalph`;
    let binds = [id];
    let conn = await oracledb.getConnection();
    let result = await conn.execute(sql, binds);
    await conn.close();
    //console.log('result', result);
    return JSON.parse(result.rows[0]);
}

async function getSalesCustomer(id){
    let sql = `SELECT '{"id":"'|| trim(smhbmcus)||'.'||smhblot||'.'||smbyr ||'","proyecto":"'||smhbmcus||'","lote":"'||smhblot||'", "precio": "'||smtotsal||'"}'  
          from proddta.f44h501 
          where smbyr=:id and smactvseq='1'
          `;
    let binds = [id];
    let conn = await oracledb.getConnection();
    
    return await conn.execute(sql, binds)
    .then(result =>{
      let parseResult = [];
      result.rows.forEach(row=>{
        //console.log('OBJECT', JSON.stringify(it[0]));
        try {
          let rowItem = JSON.parse(row[0]);  
          console.log(rowItem)
          parseResult.push(rowItem);
        } catch (error) {
          console.log('Problems with', row[0]);
        }
      });
      conn.close();
      return parseResult;
    });
}
const typeDefs = `
  type Sale{
    id: String!,
    proyecto: String,
    lote: String,
    precio: Float
  }
  type Customer {
    id: Int!,
    nombre: String!,
    rut: String,
    sales: [Sale]
  }
  type Query {
    customers: [Customer],
    customer(id: Int): Customer,
    salesCustomer(id: Int): [Sale]
  }`;

const resolvers = {
    Query: {
      customers(root, args, context, info) {
        return getAllCustomers();
      },
      customer(root, {id}, context, info) {
        return getOneCustomer(id);
      },
      salesCustomer(root, {id}, context, info) {
        console.log(root, {id}, context, info);
        return getSalesCustomer(id);
      }
    },
};

module.exports = {
  resolvers: resolvers,
  typeDefs:typeDefs
};
//export default ;
//module.export= resolvers;
//module.export= typeDefs;