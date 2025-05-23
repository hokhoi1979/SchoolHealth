import { Bounce, toast } from "react-toastify";

const messages = {
    success: {
        addClaim: "Add claim successfully!",
        editClaim: "Edit claim successfully!",
        deleteClaim: "Delete claim successfully!",
        saveRequest: "Save request successfully!",
        submitRequest: "Submit request successfully!",
        discardRequest: "Discard request successfully!",
        exportRequest: "Export request successfully!",
    },
    error: {
        saveRequest: "Please select a Project and add Claim before saving!",
        submitRequest: "Please select a Project and add Claim before submitting!",
        submitProject: "Please select a Project before submitting!",
        saveClaim: "Please add Claim before saving!",
        submitClaim: "Please add Claim before submitting!",
        selectProject: "Please select a Project before adding Claim!",
        duplicateClaim: "Claim date conflicts with an existing claim!",
    },
};

const useNotifications = () => {
    const openNoti = (type, keyOrMessage) => {
        const message = typeof keyOrMessage === "string"
            ? messages[type]?.[keyOrMessage] ?? keyOrMessage
            : "";

        if (!message) {
            console.warn(`Notification message not found: ${keyOrMessage}`);
            return;
        }

        toast[type](message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
        });
    };

    return { openNoti };
};

export default useNotifications;