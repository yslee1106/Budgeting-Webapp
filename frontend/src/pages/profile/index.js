/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "layouts/Containers/DashboardLayout";
import DashboardNavbar from "layouts/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";

// Overview page components
import Header from "pages/profile/components/header";

function Profile() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mb={2} />
            <Header>
                <MDBox mt={5} mb={3}>

                </MDBox>
            </Header>
            <Footer />
        </DashboardLayout>
    );
}

export default Profile;
