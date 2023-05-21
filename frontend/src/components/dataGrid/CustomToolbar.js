import {
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarColumnsButton,
  } from "@mui/x-data-grid";


const CustomToolbar = ({searchBar, report}) => {


  return (
    <div className="customToolbarRoot" style={{height: '50px', padding: '0 15px', display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
      <div className="left" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <GridToolbarColumnsButton/>
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport printOptions= {{ disableToolbarButton: true }} />
      {report}
      </div>
      <div className="right">
        {searchBar}
      </div>
    </div>
  );
};

export default CustomToolbar;
