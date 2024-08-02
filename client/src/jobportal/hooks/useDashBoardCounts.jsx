const useDashBoardCounts = ({applicants}) => {
    const totalApplicants = applicants.length;
    const pendingApplicants = applicants.filter(applicant => applicant.status === 'pending').length;
    const acceptedApplicants = applicants.filter(applicant => applicant.status === 'accepted').length;
    const rejectedApplicants = applicants.filter(applicant => applicant.status === 'rejected').length;
    return {
        totalApplicants,
        pendingApplicants,
        acceptedApplicants,
        rejectedApplicants
    };
}
export default useDashBoardCounts;