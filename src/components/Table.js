import React, {Component} from 'react';
import ReactHtmlParser from 'react-html-parser';


class Table extends Component {
    state = {
        tableBody: undefined
    }

    queryConfig = {
        fields: [{ name: 'payment_type', limit: 17 }, { name: 'country' }, 
        {name: 'city'}, {name: 'state'}, {name: 'product'}, {name: 'name'}],
    }

    populateTable = (data) => {
        let stringDataTable = '';
        data.map((d) => {
            stringDataTable += "<tr>"
            const row = d.map((r) => `<td>${r}</td>`);
            stringDataTable += row.join('') + "</tr>"
            return row;
        });
        this.setState(() => ({tableBody: ReactHtmlParser(stringDataTable)}));
    }

    componentDidMount = async () => {
        const unggregatedQuery = async () => {
            try {
                // Get client conection to Zoomdata
                const client = await this.props.zoomdataClient();
                // create aggregated query
                const query = await client.createQuery(this.props.zoomdataSource, this.queryConfig);
                client.runQuery(query, 
                    data => {
                        this.populateTable(data);
                    },
                    error => {
                        console.error(error);
                    },
                );
            } catch (err) {
                console.error(err);
            }
          };
          
          unggregatedQuery();
    }

    render() {
        return (
                <div className="chart-container">
                    <div className="chart-container__stage">
                    <div class="table-wrapper-scroll-y">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Payment type</th>
                                    <th>Country</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Product</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tableBody}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Table;