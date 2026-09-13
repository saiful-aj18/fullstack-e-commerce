import Container from "../components/common/Container";
import PageHeader from "../components/common/PageHeader";

function Profile() {
  return (
    <>
      <PageHeader
        title="My Profile"
        description="Manage your personal account information."
      />

      <Container className="py-12">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            {/* Profile Header */}
            <div className="bg-slate-950 px-6 py-8 sm:px-10">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-3xl font-bold text-white">
                  JD
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">
                    John Doe
                  </h2>

                  <p className="mt-1 text-slate-400">
                    john@example.com
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-10">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900">
                  Personal Information
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Update your account information below.
                </p>
              </div>

              <form className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    defaultValue="john@example.com"
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border bg-slate-100 px-4 py-3 text-slate-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Phone
                  </label>

                  <input
                    type="text"
                    placeholder="01700000000"
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Avatar URL
                  </label>

                  <input
                    type="text"
                    placeholder="https://..."
                    className="w-full rounded-lg border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">
                    Address
                  </label>

                  <textarea
                    rows="4"
                    placeholder="Your address"
                    className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                <div className="flex justify-end sm:col-span-2">
                  <button
                    type="button"
                    className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                  >
                    Update Profile
                  </button>
                </div>
              </form>

              <div className="mt-10 border-t pt-8">
                <h3 className="font-bold text-slate-900">
                  Account
                </h3>

                <button
                  type="button"
                  className="mt-4 rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Profile;