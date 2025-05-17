import Swal from 'sweetalert2'

export const useNotify = () => {
    const successNotify = (message) => {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: message,
            timer: 1500,
            showConfirmButton: false,
        })
    }

    const errorNotify = (message) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
        })
    }

    const warning = (message) => {
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: message,
        })
    }

    const confirm = async (message) => {
        const result = await Swal.fire({
            title: 'Confirmation',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Apply',
            cancelButtonText: 'Cancel',
        })
        return result.isConfirmed
    }

    return {
        successNotify,
        errorNotify,
        confirm,
        warning,
    }
}
