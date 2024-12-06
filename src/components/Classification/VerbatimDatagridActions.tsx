import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import YearSelection from './Actions/YearSelection';
import StatusSelection from './Actions/StatusSelection';
import RelaunchClassification from './Actions/RelaunchClassification';
import DeleteVerbatim from './Actions/DeleteVerbatim';
import UploadCsv from './Actions/UploadCsv';

export default function VerbatimDatagridActions() {
    return(
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid size={{xs: 12 , sm:6, md:4, lg:2 }}>
                <YearSelection/>
            </Grid>
            <Grid size={{xs: 12 , sm:6, md:4, lg:2 }}>
                <StatusSelection/>
            </Grid>
            <Grid size={{xs: 12 , sm:6, md:4, lg:2 }}>
                <RelaunchClassification/>
            </Grid>
            <Grid size={{xs: 12 , sm:6, md:4, lg:2 }}>
                <DeleteVerbatim/>
            </Grid>
            <Grid size={{xs: 12 , sm:6, md:4, lg:2 }}>
                <UploadCsv/>
            </Grid>
        </Grid>
    )
}